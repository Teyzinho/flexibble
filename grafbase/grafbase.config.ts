import { g, auth, config } from '@grafbase/sdk'

// https://grafbase.com/docs/auth

// Define Data Models
// https://grafbase.com/docs/database

//Criação do modelo de Usuário
const User = g.model('User',{
  name: g.string().length({min: 3 , max:20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
})

const Project = g.model('Project', {
  title: g.string().length({min:3,max:20}),
  description: g.string(),
  image: g.url(),
  liveStireUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User)
})


export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth

})
