function updateUserRoute({ body, params }) {
  const { name, email, password } = body;
  
  updateUserController({ 
    data: {
      name, 
      email, 
      password
    }, 
    params 
  })
}

function updateUserController({ data, params }) {
  userRepository.update({data, params})
}

const userRepository = {
  update: ({data, params}) => { },
}