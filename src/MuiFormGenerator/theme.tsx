import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    props: {
        MuiTextField: {
          variant: 'outlined',
        },
      },
    // palette: {
    //   primary: {
    //     main: purple[500],
    //   },
    //   secondary: {
    //     main: green[500],
    //   },
    // },
  })