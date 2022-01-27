import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let userTokensRepository: IUserTokensRepository;
let dayjsDateProvider: IDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Mail", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        userTokensRepository = new UserTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            userTokensRepository,
            dayjsDateProvider,
            mailProvider,
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepository.create({
            driver_license: "123456",
            email: "pepeu@teste.com",
            name: "pepeu",
            password: "271198",
        });

        await sendForgotPasswordMailUseCase.execute("pepeu@teste.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an mail to user if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("pepeu@teste.com"),
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(userTokensRepository, "create");

        await usersRepository.create({
            driver_license: "123456",
            email: "pepeu@teste.com",
            name: "pepeu",
            password: "271198",
        });

        await sendForgotPasswordMailUseCase.execute("pepeu@teste.com");

        expect(generateTokenMail).toBeCalled();
    });
});
