import { Vertice } from './vertice.model'
import { Arco } from './arco.model'

export class FordFulkerson {
    private vertices: Array<Vertice>;
    private caminho: Caminho;
    private verticeOrigem: Vertice;
    private verticeDestino: Vertice;
    private solucao: Array<number>;
    private cont: number = 0;


    constructor(vertices: Array<Vertice>) {
        this.vertices = vertices;

        this.verticeOrigem = this.pesquisaVerticeOrigem();
        this.verticeDestino = this.pesquisaVerticeDestino();

        this.solucao = new Array();

    }




    public executar() {
        let auxParada = false;
        let qtdArcosOrigem = this.verticeOrigem.arcos.length + 1;
        while (!auxParada) {
            this.caminho = new Caminho();
            let proximoVertice: Vertice = undefined;
            this.caminho.vertices.push(this.verticeOrigem);
            proximoVertice = this.pesquisaCaminho(this.verticeOrigem);
            //   console.log("Origem: " + this.verticeOrigem);
            //  console.log("Destino: " + this.verticeDestino);
            //  console.log("Destino: " + this.verticeDestino);

            while ((this.caminho.vertices[this.caminho.vertices.length - 1] != this.verticeDestino) && !auxParada) {
                proximoVertice = this.pesquisaCaminho(proximoVertice);
                if (proximoVertice == this.verticeOrigem) {
                    this.cont++;
                }
                if (this.cont == qtdArcosOrigem) {
                    auxParada = true;
                }
                // console.log("contador = " + this.cont + " QTD Arcos = " + qtdArcosOrigem);
            }
            //  this.atualVertice = undefined;
            this.cont = 0;
            console.log("================================================================")
            this.imprimirVertices();
            console.log("================================================================")
            this.resultado();
            console.log("================================================================")
            if (!auxParada) {
                this.reconstrutor();

            }
        }
        // SOLUÇÃO
        this.resultado();
    }

    //Retorna o proximo vertice, salva o vertice e o indice do arco do proximo vertice no array caminho
    private pesquisaCaminho(vertice: Vertice) {
        console.log("vertice")
        console.log(vertice)
        let proximoVertice: Vertice = vertice;

        for (let i = 0; i < vertice.arcos.length; i++) {
            if (vertice.arcos[i].peso > 0 && !this.verificaVerticeCaminho(vertice.arcos[i].rotuloVerticeAdjacente)) {
                proximoVertice = this.pesquisaVerticePorRotulo(vertice.arcos[i].rotuloVerticeAdjacente);
                this.caminho.indiceArco.push(i);
                this.caminho.vertices.push(proximoVertice)
                return proximoVertice;
            }
        }
    }

    private verificaVerticeCaminho(rotulo: string): boolean {
        return this.caminho.vertices.some(s =>
            s.rotulo == rotulo
        )
    }

    private reconstrutor() {
        let menorPeso = this.pesquisaMenorPeso();
        this.solucao.push(menorPeso);
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

    private resultado() {
        let resultado = this.solucao.reduce((acc, s) => {
            return acc + s
        }, 0)
        this.solucao.forEach(s => {
            console.log(s);
        })
        console.log("Fluxo máximo: " + resultado);
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

