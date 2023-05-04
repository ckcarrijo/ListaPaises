//definir a url da API.
const url = "https://restcountries.com/v2/all"
//const listaPaises =  document.querySelector('#listaPaises')

// Faz uma solicitação GET para  a URL da API usando a função FETCH()
//Fetch() retorna uma promessa (Promise) que será resolvida com a
// resposta da solicitação

const listaPaises = $('#listaPaises')

const cardsPorPagina = 12
let paginaAtual = 1 

fetch(url)
    //Quando a promessa for resolvida, converte a resposta em 
    //formato JSON usando o método .json()
    .then(response => response.json())
    //Quando a promessa for resolvida, percorre os itens de array e 
    //os dados retornados serão inseridos dentro de uma <li>
    .then(data => {

        let totalPaginas = Math.ceil(data.length / cardsPorPagina)

        function mostrarPagina(pagina){

            let inicio = (pagina - 1) * cardsPorPagina
            let fim = inicio + cardsPorPagina
            listaPaises.empty()

        for(let i = inicio; i < fim && i < data.length; i++){
            const pais = data[i]
            const div = document.createElement("div")
            
            div.innerHTML = `
            <div class="card" style="width: 18rem; height: 25rem;">
                <img src="${pais.flag}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title pais">${pais.name}</h5>
                    <h6 class="card-title capital">${pais.capital}</h6>
                    <h6 class="card-title regiao">${pais.region}</h6>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${i}">
                        Ver Mais!!
                    </button>

                    <div class="modal fade" id="modal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">${pais.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                    <div class="modal-body">
                                    <img src="${pais.flag}" width="150">
                                    <p>Capital: ${pais.capital}</p>
                                    <p>AlfaCode: ${pais.alpha2Code}</p>
                                    <p>Código telefonico: ${pais.callingCodes}</p>
                                    <p>Região: ${pais.region}</p>
                                    <p>Sub: ${pais.subregion}</p>
                                    <p>População: ${pais.population}</p>
                                    <p>Denominação: ${pais.demonym}</p>
                                </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            
            

            listaPaises.append(div);
        }
      }

      function atualizarPagina(){
      
      $('#contador-pagina').text(`pagina ${paginaAtual} de ${totalPaginas}`)  
      $('#anterior').prop('disabled', paginaAtual === 1)
      $('#proximo').prop('disabled'), (paginaAtual === totalPaginas)
      mostrarPagina(paginaAtual)   
    }


    atualizarPagina()

    $('#anterior').click(() => {
        if(paginaAtual > 1){
            paginaAtual--
            atualizarPagina()
        }


    })
    //--------------
    $('#proximo').click(() => {
        if(paginaAtual < totalPaginas){
            paginaAtual++
            atualizarPagina()
        }
    })
    //----------------  
    })
    // Se ocorre um erro durante a solicitação fetch() ele será 
    //capturado por .catch() e o erro será impresso no console.
    .catch(error => console.error(error))



        