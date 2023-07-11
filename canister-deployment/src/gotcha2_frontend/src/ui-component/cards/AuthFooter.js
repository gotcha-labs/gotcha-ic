// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
            gotcha.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://argonteq.com/" target="_blank" underline="hover">
            &copy; argonteq.com
        </Typography>
    </Stack>
);

export default AuthFooter;
