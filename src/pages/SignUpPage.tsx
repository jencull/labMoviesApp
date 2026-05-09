import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

type SignUpFormData = {
    username: string;
    email: string;
    password: string;
};

const styles = {
    root: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
    },
    form: {
        width: "100%",
        "& > * ": {
            marginTop: 2,
        },
    },
    submit: {
        marginRight: 2,
    },
} as const;

const SignUpPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const defaultValues = {
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignUpFormData>(defaultValues);

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        setErrorMessage("");
        const res = await fetch(
            `${import.meta.env.VITE_AUTH_API}/auth/signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            }
        );

        if (!res.ok) {
            const body = await res.json().catch(() => ({ message: "Sign up failed" }));
            setErrorMessage(body.message || "Sign up failed");
            return;
        }

        navigate("/confirm", { state: { username: data.username } });
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Sign Up
            </Typography>
            {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="username"
                            label="Username"
                            autoFocus
                        />
                    )}
                />
                {errors.username && (
                    <Typography variant="h6" component="p">
                        {errors.username.message}
                    </Typography>
                )}
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="email"
                            label="Email"
                            type="email"
                        />
                    )}
                />
                {errors.email && (
                    <Typography variant="h6" component="p">
                        {errors.email.message}
                    </Typography>
                )}
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/,
                            message: "Password must include uppercase, lowercase, and a symbol",
                        },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="password"
                            label="Password"
                            type="password"
                        />
                    )}
                />
                {errors.password && (
                    <Typography variant="h6" component="p">
                        {errors.password.message}
                    </Typography>
                )}
                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => navigate("/signin")}
                    >
                        Already have an account?
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SignUpPage;
