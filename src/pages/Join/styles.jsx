const styles = () => ({
  root: {
    width: '100%',
    height: '95vh',
  },
  paper: {
    width: '50%',
    height: '50%',
    padding: '2rem',
    backgroundColor: '#FBBF77 !important',
  },
  columnGrid: {
    height: '100%',
  },
  typography: {
    textAlign: 'center !important',
    fontWeight: 'bold !important',
    color: '#fff',
  },
  textField: {
    marginRight: '20px !important',
  },
  joinButton: {
    textTransform: 'none !important',
    color: 'white !important',
    backgroundColor: '#3f51b5 !important',
    '&:hover': {
      color: '#3f51b5 !important',
      backgroundColor: '#fff !important',
    },
    '&:disabled': {
      color: '#fff !important',
      backgroundColor: 'gray !important',
    },
  },
})

export default styles
