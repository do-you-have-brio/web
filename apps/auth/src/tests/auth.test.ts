import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../service"; // ajuste o caminho se necessário
import { HTTPException } from "hono/http-exception";
import type { PrismaClient } from "@prisma/client";
import { sign } from "hono/jwt";

// 1. Mock do Prisma
type MockedPrismaClient = {
  user: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

const mockPrisma: MockedPrismaClient = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
};

// 2. Declaração global para Bun (somente em testes)
declare global {
  var Bun: {
    password: {
      hash: (password: string) => Promise<string>;
      verify: (password: string, hash: string) => Promise<boolean>;
    };
  };
}

// 3. Mock global para Bun
globalThis.Bun = {
  password: {
    hash: vi.fn(),
    verify: vi.fn(),
  },
};

// 4. Mock do arquivo env.ts
vi.mock('../env', () => ({
  env: {
    DATABASE_URL: 'mocked_url',
    SECRET_KEY: 'mocked_key',
  },
}));

// Mock do sign do JWT
vi.mock("hono/jwt", () => ({
  sign: vi.fn(),
}));


describe("AuthService - signup", () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService(mockPrisma as unknown as PrismaClient);
  });

  test("Deve criar usuário novo com senha hash", async () => {
    const dto = { email: "teste@teste.com", password: "12345678" };

    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: 1,
      email: dto.email,
      password: "hashedPassword",
    });
    vi.mocked(Bun.password.hash).mockResolvedValue("hashedPassword");

    const result = await authService.signup(dto);

    expect(Bun.password.hash).toHaveBeenCalledWith(dto.password);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        email: dto.email,
        password: "hashedPassword",
      },
    });
    expect(result).toEqual({
      id: 1,
      email: dto.email,
      password: "hashedPassword",
    });
  });

  test("Deve lançar erro se o usuário já existir", async () => {
    const dto = { email: "teste@teste.com", password: "123456" };

    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: dto.email,
      password: "jáexistente",
    });

    await expect(authService.signup(dto)).rejects.toThrow(HTTPException);
    expect(mockPrisma.user.create).not.toHaveBeenCalled();
  });
});

describe("AuthService - signin", () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService(mockPrisma as unknown as PrismaClient);
  });

  test("Deve retornar token se email e senha estiverem corretos", async () => {
    const dto = { email: "teste@teste.com", password: "123456" };
    const userFromDb = {
      id: 1,
      email: dto.email,
      password: "hashedPassword",
      name: "Usuário",
    };

    mockPrisma.user.findUnique.mockResolvedValue(userFromDb);
    vi.mocked(Bun.password.verify).mockResolvedValue(true);
    vi.mocked(sign).mockResolvedValue("mocked.jwt.token");

    const result = await authService.signin(dto);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(Bun.password.verify).toHaveBeenCalledWith(
      dto.password,
      userFromDb.password,
    );
    expect(sign).toHaveBeenCalled();
    expect(result).toBe("mocked.jwt.token");
  });

  test("Deve lançar erro 404 se usuário não for encontrado", async () => {
    const dto = { email: "inexistente@teste.com", password: "123456" };

    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(authService.signin(dto)).rejects.toThrow(HTTPException);
    expect(Bun.password.verify).not.toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });

  test("Deve lançar erro se senha for inválida", async () => {
    const dto = { email: "teste@teste.com", password: "senhaerrada" };
    const userFromDb = {
      id: 1,
      email: dto.email,
      password: "hashedPassword",
      name: "Usuário",
    };

    mockPrisma.user.findUnique.mockResolvedValue(userFromDb);
    vi.mocked(Bun.password.verify).mockResolvedValue(false);

    await expect(authService.signin(dto)).rejects.toThrow("Invalid password");
    expect(Bun.password.verify).toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });
});