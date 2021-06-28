
export default (req, res) => {
    res.statusCode = 200
    res.json({ 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' ,
        name: 'Jesdakorn Saelor',
        username:'Jesdakorn'
    })
  }
  