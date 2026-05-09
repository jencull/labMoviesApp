import { useContext, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../contexts/AuthContext";

type SignInFormData = {
    username: string;
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
};

const SignInPage = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const defaultValues = {
        defaultValues: {
            username: "",
            password: "",
        },
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInFormData>(defaultValues);

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        setErrorMessage("");
        const res = await fetch(
            `${import.meta.env.VITE_AUTH_API}/auth/signin`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: data.username, password: data.password }),
            }
        );

        if (!res.ok) {
            const body = await res.json().catch(() => ({ message: "Sign in failed" }));
            setErrorMessage(body.message || "Sign in failed");
            return;
        }

        const body = await res.json();
        context.signIn(body.token, data.username);
        navigate("/");
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Sign In
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
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
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
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => navigate("/signup")}
                    >
                        Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SignInPage;
