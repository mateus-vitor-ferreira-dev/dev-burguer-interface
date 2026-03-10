import { Controller, useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {
    Container,
    ErrorMessage,
    Form,
    InputGroup,
    Label,
    LabelUpload,
    Input,
    SubmitButton,
} from "./styles"

import { ImageIcon } from "@phosphor-icons/react"

import Select from "react-select"

import { api } from "../../../services/api"
import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required("O nome do produto é obrigatório"),

    price: yup
        .string()
        .required("O preço é obrigatório")
        .matches(/^\d+(,\d{1,2})?$/, "Use o formato 10,50"),

    category: yup
        .object()
        .required("Escolha uma categoria"),

    file: yup
        .mixed()
        .test("required", "Escolha um arquivo", value => value && value.length > 0)
        .test(
            "fileSize",
            "Arquivo máximo 7MB",
            value => value && value[0]?.size <= 7 * 1024 * 1024
        )
        .test(
            "fileType",
            "Apenas PNG ou JPEG",
            value =>
                value &&
                ["image/png", "image/jpeg"].includes(value[0]?.type)
        ),

    offer: yup.boolean()
});


export default function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get("/categories");
            setCategories(data);
        }
        loadCategories();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {

            const priceFormatted = Math.round(
                Number(data.price.replace(",", ".")) * 100
            );

            const productFormData = new FormData();

            productFormData.append("name", data.name);
            productFormData.append("price", priceFormatted);
            productFormData.append("category_id", data.category.id);
            productFormData.append("file", data.file[0]);
            productFormData.append("offer", data.offer ?? false);

            await api.post("/products", productFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            toast.success("Produto adicionado com sucesso!");

            setTimeout(() => {
                navigate("/admin/produtos");
            }, 2000);

        } catch (error) {
            toast.error("Erro ao adicionar produto!");
        }
    };

    return (
        <Container>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input
                        type="text"
                        placeholder="Digite um valor(Ex: 10,50)"
                        {...register("price")}
                    />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <ImageIcon />
                        <input
                            type="file"
                            {...register("file")}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value?.target?.files[0]?.name);
                                register("file").onChange(value);
                            }}
                        />
                        {fileName ? fileName : "Upload do Produto"}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Selecione uma categoria"
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                menuPortalTarget={document.body}
                                defaultValue={null}
                            />
                        )}
                    />

                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <SubmitButton>
                    Adicionar Produto
                </SubmitButton>

            </Form>
        </Container>
    )
}