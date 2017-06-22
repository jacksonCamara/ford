import { Vertice } from './vertice.model'

export class FordFulkerson {
    private vertices: Array<Vertice>;
    private caminho: Caminho;

    constructor(vertices: Array<Vertice>) {
        this.vertices = vertices;
        this.caminho = new Caminho();
    }




    public executar() {
        //  this.imprimirVertices();
        // this.pesquisaCaminho();
        // console.log(this.pesquisaVerticePorRotulo('b'));
        //console.log(this.pesquisaVerticeOrigem())
        //console.log(this.pesquisaVerticeDestino())
        let verticeOrigem: Vertice = this.pesquisaVerticeOrigem();
        let verticeDestino: Vertice = this.pesquisaVerticeDestino();
        let vertice = undefined;
        let continua = 0;
        let proximoVertice

        this.caminho.vertices.push(verticeOrigem);
        proximoVertice = this.pesquisaCaminho(verticeOrigem);
        while (continua < 3) {
            continua++;
            proximoVertice = this.pesquisaCaminho(proximoVertice);

        }
  
      //  console.log(this.caminho)
       // console.log(this.pesquisaMenorPeso())
       this.reconstrutor();
       this.imprimirVertices();
    }

    private reconstrutor() {
        this.subtrator();
    }

    private subtrator(){
        let menorPeso = this.pesquisaMenorPeso();
        this.vertices.map(v => {
            for (let i = 0; i < this.caminho.indiceArco.length; i++) {
                if (v.rotulo == this.caminho.vertices[i].rotulo) {
                    v.arcos[this.caminho.indiceArco[i]].peso -= menorPeso;
                }
            }

        })
    }

    private pesquisaMenorPeso() {
        let menorPeso = undefined;
        for (let i = 0; i < this.caminho.indiceArco.length; i++) {
            if (menorPeso == undefined) {
                menorPeso = this.caminho.vertices[i].arcos[this.caminho.indiceArco[i]].peso
            } else if (menorPeso > this.caminho.vertices[i].arcos[this.caminho.indiceArco[i]].peso) {
                menorPeso = this.caminho.vertices[i].arcos[this.caminho.indiceArco[i]].peso
            }
        }
        return menorPeso;
    }



    //Retorna o proximo vertice, salva o vertice e o indice do arco do proximo vertice no array caminho
    private pesquisaCaminho(vertice: Vertice) {
        let proximoVertice: Vertice;
        for (let i = 0; i < vertice.arcos.length; i++) {
            if (vertice.arcos[i].peso > 0) {
                proximoVertice = this.pesquisaVerticePorRotulo(vertice.arcos[i].rotuloVerticeAdjacente);
                this.caminho.indiceArco.push(i);
                this.caminho.vertices.push(proximoVertice)
                return proximoVertice;
            }
        }
    }


    //Pesquisa o vertice pelo rotulo no array vertices, se encontra retorna o vertice, se não encontrado retorna undefined
    private pesquisaVerticePorRotulo(verticeRotulo: string): Vertice {
        return this.vertices.find(v =>
            v.rotulo == verticeRotulo
        )
    }

    //Retorna o proximo vertice
    private pesquisaCaminho0(vertice: Vertice) {
        let arco = vertice.arcos.find(a =>
            a.peso > 0
        )
        return this.pesquisaVerticePorRotulo(arco.rotuloVerticeAdjacente);
    }

    private pesquisaVerticeOrigem(): Vertice {
        let cont = 0;
        let verticesOrigem: Array<Vertice> = this.vertices.filter(v => {
            cont = 0;
            this.vertices.forEach(vv => {
                vv.arcos.forEach(a => {
                    if (v.rotulo == a.rotuloVerticeAdjacente) {
                        cont++;
                    }
                })
            })
            if (cont == 0) {
                return v;
            }
        })

        if (verticesOrigem.length == 1) {
            return verticesOrigem[0]
        } else if (verticesOrigem.length == 0) {
            console.log("Não existe vertice Origem")
            return undefined
        } else {
            //montar super origem
            //Chamar método super origem passando como arugmento o array verticesOrigem
            //O método super origem deve retornar o vertice origem para este método retornar o vertice origem
            return undefined
        }
    }

    private pesquisaVerticeDestino(): Vertice {
        let verticesDestino: Array<Vertice> = new Array();
        this.vertices.forEach(v => {
            if (v.arcos.length == 0) {
                verticesDestino.push(v);
            }
        })
        if (verticesDestino.length == 1) {
            return verticesDestino[0]
        } else if (verticesDestino.length == 0) {
            console.log("Não existe nenhum vertice destino")
            return undefined
        } else {
            //montar super destino
            //Chamar método super origem passando como arugmento o array verticesDestino
            //O método super destino deve retornar o vertice destino para este método retornar o vertice destino
            return undefined
        }

    }





    private imprimirVertices() {
        for (let i = 0; i < this.vertices.length; i++) {
           // console.log(i);
            console.log(this.vertices[i])
        }
    }


}


class Caminho {
    public vertices: Array<Vertice> = new Array();
    public indiceArco: Array<number> = new Array();
}

