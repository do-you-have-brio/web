import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../service"; // ajuste o caminho se necessário
import { HTTPException } from "hono/http-exception";

// 1. Mock do Prisma
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
};

// 2. Mock global para Bun
(globalThis as any).Bun = {
  password: {
    hash: vi.fn(),
  },
};

vi.mock('../env', () => ({
  env: {
    DATABASE_URL: 'mocked_url',
    SECRET_KEY: 'mocked_key',
    // outros valores se precisar
  },
}));


describe("AuthService - signup", () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService(mockPrisma as any);
  });

  test("Deve criar usuário novo com senha hash", async () => {
    const dto = { email: "teste@teste.com", password: "12345678" };

    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: 1,
      email: dto.email,
      password: "hashedPassword",
    });
    (Bun.password.hash as any).mockResolvedValue("hashedPassword");

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
