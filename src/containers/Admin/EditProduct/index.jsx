import { Controller, useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation, useNavigate } from "react-router-dom"

import {
    Container,
    ContainerCheckbox,
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

const schema = yup
    .object({
        name: yup.string().required("O nome do produtoé obrigatório"),
        price: yup
            .string()
            .required("O preço é obrigatório")
            .matches(/^\d+(,\d{1,2})?$/, "Use o formato 10,50"),
        category: yup.object().required("Escolha uma categoria"),
        offer: yup.boolean(),
    });

export default function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const {
        state: { product },
    } = useLocation();

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

            if (data.file?.[0]) {
                productFormData.append("file", data.file[0]);
            }

            productFormData.append("offer", data.offer ?? false);

            await api.put(`/products/${product.id}`, productFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            toast.success("Produto editado com sucesso!");

            setTimeout(() => {
                navigate("/admin/produtos");
            }, 2000);

        } catch (error) {
            toast.error("Erro ao editar o produto!");
        }
    };



    return (
        <Container>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <InputGroup>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        {...register("name")}
                        defaultValue={product.name}
                    />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input
                        type="text"
                        {...register("price")}
                        defaultValue={(product.price / 100).toFixed(2).replace(".", ",")}
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
                        defaultValue={product.category}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Selecione uma categoria"
                                name="category"
                                options={categories}
                                getOptionLabel={category => category.name}
                                getOptionValue={category => category.id}
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )}
                    />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckbox>
                        <input
                            type="checkbox"
                            defaultChecked={product.on_sale}
                            {...register("offer")}
                        />
                        <Label>Produto em Oferta?</Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>
                    Editar Produto
                </SubmitButton>

            </Form>
        </Container>
    )
}