const repositoryName = 'unform 2'

export function RepositoryList() {
  return (
    <section className="repository-list" >
      <h1>Lista de Repositorios</h1>

      <ul>
        <li>
          <strong>{repositoryName}</strong>
          <p>Forms in ReactJS</p>

          <a href="#">
            Accesar repositorio
          </a>
        </li>

        <li>
          <strong>unform</strong>
          <p>Forms in ReactJS</p>

          <a href="#">
            Accesar repositorio
          </a>
        </li>

        <li>
          <strong>unform</strong>
          <p>Forms in ReactJS</p>

          <a href="#">
            Accesar repositorio
          </a>
        </li>
      </ul>
    </section>
  )
}