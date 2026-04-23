import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  root: {
    display: 'flex',
    justifyContent: "center",
    '& > * + *': {
      marginLeft: 2,
    },
  },
};

const CircularIndeterminate= () => {
    return (
        <div style={styles.root}>
            <CircularProgress />
            <CircularProgress />
        </div>
    );
}

export default CircularIndeterminate;
