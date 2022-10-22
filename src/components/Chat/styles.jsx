const styles = () => ({
  // Message Styles
  root: {
    backgroundColor: '#add8e6 !important',
    borderRadius: '10px',
    padding: 20,
  },
  nameTypography: {
    fontWeight: 'bold',
  },

  // Channel Styles
  channelContainer: {
    backgroundColor: '#FBBF77 !important',
    borderRadius: '10px',
    height: '8%',
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
  },
  ul: {
    padding: 5,
    height: '100vh',
    overflowY: 'scroll',
    listStyle: 'none',
    borderRadius: '10px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#add8e6 transparent',
    margin: '0',
    marginBottom: '10px',
    '&::-webkit-scrollbar': {
      borderRadius: 10,
      width: 7,
      backgroundColor: 'lightgrey !important',
      backgroundWidth: 2,
      scrollbarGutter: 'stable',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 10,
      backgroundColor: 'transparent !important',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      scrollPaddingLeft: 50,
      backgroundColor: '#add8e6 !important',
      minHeight: 24,
      minWidth: 24,
    },
    '&::-webkit-scrollbar-thumb:focus': {
      backgroundColor: '#add8e6 !important',
    },
    '&::-webkit-scrollbar-thumb:active': {
      backgroundColor: '#add8e6 !important',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#add8e6 !important',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
  messageContainer: {
    marginBottom: '10px',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#FBBF77 !important  ',
    borderRadius: '10px',
  },
  textField: {
    width: '100%',
  },
})

export default styles
