import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../../hooks/UserContext.jsx";
import { api } from "../../services/api.js";
import { toast } from "react-toastify";

import {
    Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer,
    Link,
} from "./styles";

import Logo from "../../assets/Logo.png"
import { Button } from "../../components/Button";

const schema = yup
    .object({
        email: yup.string().email('Digite um email válido').required('O e-mail é obrigatório'),
        password: yup.string().required('Digite uma senha').min(6, 'A senha deve conter no mínimo 6 caracteres'),
    });

export default function Login() {
    const navigate = useNavigate();
    const { putUserData } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        try {
            const { data: userData } = await toast.promise(
                api.post("/sessions", {
                    email: data.email,
                    password: data.password,
                }),
                {
                    pending: "Verificando seus dados...",
                    success: "Login realizado com sucesso!",
                    error: "Ocorreu um erro ao realizar o login. Email ou senha incorretos.",
                }
            );

            localStorage.setItem("devburguer:userData", JSON.stringify(userData));

            putUserData(userData);

            setTimeout(() => {
                if (userData?.admin) {
                    navigate("/admin/pedidos");
                } else {
                    navigate("/");
                }

            }, 2000);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="Logo dev-burguer" />
            </LeftContainer>
            <RightContainer>
                <Title>Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        {/* Elvis operator */}
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                </Form>
                <p>
                    Não possui conta?<Link to="/cadastro">Clique aqui!</Link>
                </p>
            </RightContainer>
        </Container>
    );
}

