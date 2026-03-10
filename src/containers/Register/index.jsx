import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
    Container,
    LeftContainer,
    RightContainer,
    Title,
    Form,
    InputContainer,
    Link,
} from "./styles.js";
import Logo from "../../assets/Logo.png"
import { Button } from "../../components/Button/index.jsx";

const schema = yup
    .object({
        name: yup.string().required('Digite seu nome completo'),
        email: yup.string().email('Digite um email válido').required('O e-mail é obrigatório'),
        password: yup.string().required('Digite uma senha').min(6, 'A senha deve conter no mínimo 6 caracteres'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirme sua senha'),
    });

export default function Register() {

    const navigate = useNavigate();

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
            const { status } = await api.post(
                "/users",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                {
                    validateStatus: (status) => true,
                },
            );

            if (status === 201 || status === 200) {
                toast.success("Conta criada com sucesso!");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else if (status === 409) {
                toast.error("O email já está em uso. Faça login para continuar.");
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("😭 Falha no sistema! Tente novamente");
        }

    };

    return (
        <Container>

            <LeftContainer>
                <img src={Logo} alt="Logo dev-burguer" />
            </LeftContainer>

            <RightContainer>
                <Title>
                    Criar Conta
                </Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>

                        <label>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Confirmar senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit">Criar Conta</Button>

                </Form>

                <p>
                    Já possui conta?<Link to="/login">Clique aqui!</Link>
                </p>

            </RightContainer>
        </Container>
    );
}

