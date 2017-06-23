import { Vertice } from './vertice.model'
import { Arco } from './arco.model'

export class FordFulkerson {
    private vertices: Array<Vertice>;
    private caminho: Caminho;
    private verticeOrigem: Vertice;
    private verticeDestino: Vertice;
    private solucao: Array<number>;

    constructor(vertices: Array<Vertice>) {
        this.vertices = vertices;
        this.caminho = new Caminho();
        this.verticeOrigem = this.pesquisaVerticeOrigem();
        this.verticeDestino = this.pesquisaVerticeDestino();
        this.caminho.vertices.push(this.verticeOrigem);
        this.solucao = new Array();
        
    }




    public executar() {
        let proximoVertice: Vertice;

        proximoVertice = this.pesquisaCaminho(this.verticeOrigem);
        while (this.caminho.vertices[this.caminho.vertices.length - 1] != this.verticeDestino) {
            proximoVertice = this.pesquisaCaminho(proximoVertice);

        }

        this.reconstrutor();
        this.imprimirVertices();
    }

    private reconstrutor() {
        let menorPeso = this.pesquisaMenorPeso();
        this.subtrator(menorPeso);
        this.somador(menorPeso);
    }

    private subtrator(menorPeso: number) {
        this.vertices.map(v => {
            for (let i = 0; i < this.caminho.indiceArco.length; i++) {
                if (v.rotulo == this.caminho.vertices[i].rotulo) {
                    v.arcos[this.caminho.indiceArco[i]].peso -= menorPeso;
                }
            }
        })
    }

    private somador(menorPeso: number) {
        for (let i = this.caminho.indiceArco.length; i > 0; i--) {
            let vertice = this.pesquisaVerticePorRotulo(this.caminho.vertices[i].rotulo)
            if (!this.pesquisaArcoPorRotulo(this.caminho.vertices[i], this.caminho.vertices[i - 1].rotulo)) {
                this.adicionarArco(vertice, menorPeso, this.caminho.vertices[i - 1].rotulo);
            } else {
                this.adicionarPesoArco(vertice, this.caminho.vertices[i - 1].rotulo, menorPeso)
            }
        }
    }

    private resultado(){
        let resultado = this.solucao.reduce((acc, s) => {
            return acc + s
        }, 0)
        console.log(resultado)
    }

    private pesquisaArcoPorRotulo(vertice: Vertice, verticeRotuloAdjacente: string) {
        return vertice.arcos.some(a =>
            a.rotuloVerticeAdjacente == verticeRotuloAdjacente
        )
    }

    private adicionarPesoArco(vertice: Vertice, verticeAdjacente, menorPeso: number) {
        vertice.arcos.map(a => {
            if (a.rotuloVerticeAdjacente == verticeAdjacente) {
                a.peso += menorPeso;
            }
        })
    }

    private adicionarArco(vertice: Vertice, peso, verticeAdjacente) {
        vertice.arcos.push(new Arco(verticeAdjacente, peso))
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
            console.log(this.vertices[i])
        }
    }
}

class Caminho {
    public vertices: Array<Vertice> = new Array();
    public indiceArco: Array<number> = new Array();
}

