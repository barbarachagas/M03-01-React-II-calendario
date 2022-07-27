import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { IUser, singInEndpoint } from "../app/backend";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253, 236, 234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen(props: ILoginScreenProps) {
  const [email, setEmail] = useState("danilo@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const classes = useStyles();

  function singIn(evt: React.FormEvent) {
    evt.preventDefault();
    singInEndpoint(email, password).then(props.onSignIn, (e) => {
      setError("E-mail ou senha incorreto.");
      console.error(e);
    });
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={singIn}>
        <TextField
          margin="normal"
          label="e-mail"
          fullWidth
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="senha"
          fullWidth
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
