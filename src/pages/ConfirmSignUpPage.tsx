import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

type ConfirmFormData = {
    username: string;
    code: string;
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

const ConfirmSignUpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prefillUsername = (location.state as { username?: string })?.username ?? "";
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const defaultValues = {
        defaultValues: {
            username: prefillUsername,
            code: "",
        },
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<ConfirmFormData>(defaultValues);

    const onSubmit: SubmitHandler<ConfirmFormData> = async (data) => {
        setErrorMessage("");
        const res = await fetch(
            `${import.meta.env.VITE_AUTH_API}/auth/confirm-signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    code: data.code,
                }),
            }
        );

        if (!res.ok) {
            const body = await res.json().catch(() => ({ message: "Confirmation failed" }));
            setErrorMessage(body.message || "Confirmation failed");
            return;
        }

        setSuccessMessage("Account confirmed! Redirecting to sign in...");
        setTimeout(() => navigate("/signin"), 1500);
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Confirm Your Account
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Enter the confirmation code sent to your email.
            </Typography>
            {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}
            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    defaultValue={prefillUsername}
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
                            InputProps={{ readOnly: !!prefillUsername }}
                        />
                    )}
                />
                {errors.username && (
                    <Typography variant="h6" component="p">
                        {errors.username.message}
                    </Typography>
                )}
                <Controller
                    name="code"
                    control={control}
                    rules={{ required: "Confirmation code is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="code"
                            label="Confirmation Code"
                            autoFocus
                        />
                    )}
                />
                {errors.code && (
                    <Typography variant="h6" component="p">
                        {errors.code.message}
                    </Typography>
                )}
                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Confirm
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ConfirmSignUpPage;
