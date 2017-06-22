import { Grafo } from "./grafo.model"
import { Vertice } from "./vertice.model"


export class Prim {

    private verticeInicialRotulo: string = null;
    private verticeInicial: Vertice;
    private verticesConjuntoAberto: Array<Vertice>;
    private verticesConjuntoFechado: Array<Vertice> = new Array();
    private verticeMaisProximo: Vertice;
    private menorPeso: number;
    private verticeAberto: Vertice;
    private verticeCaminho: Vertice;
    private solucao: Array<Solucao> = new Array();
    private pesoTotal: number = 0;

    constructor(vertices: Array<Vertice>, verticeInicial: string) {
        this.verticeInicialRotulo = verticeInicial;
        this.verticesConjuntoAberto = vertices;
    }

    public executar(): void {
        this.verticeInicial = this.pesquisaVerticeConjuntoAberto(this.verticeInicialRotulo);
        if (this.verticeInicial) {
            this.verticeMaisProximo = undefined;
            this.menorPeso = undefined;
            this.adicionaVerticeConjuntoFechado(this.verticeInicial);
            this.analisador();
            console.log("=================== PRIM ===========================")
            this.imprimirSolucao();
            this.imprimirPesoTotal();
        } else {
            console.log("Vertice Inicial não encontrado")
        }
    }


    private analisador() {
        while (this.verticesConjuntoAberto.length > 0) {
            this.verticesConjuntoFechado.forEach(v => {
                v.arestas.forEach(a => {
                    this.verticeAberto = undefined;
                    this.verticeAberto = this.pesquisaVerticeConjuntoAberto(a.rotuloVerticeAdjacente);
                    if (this.verticeAberto) {
                        if (this.menorPeso == undefined || a.peso < this.menorPeso) {
                            this.menorPeso = a.peso;
                            this.verticeMaisProximo = this.verticeAberto;
                            this.verticeCaminho = v;
                        }
                    }
                })
            })
            this.adicionaVerticeConjuntoFechado(this.verticeMaisProximo);
            this.solucao.push(new Solucao(this.verticeMaisProximo.rotulo, this.verticeCaminho.rotulo));
            this.pesoTotal += this.menorPeso;
            this.menorPeso = undefined;
            this.verticeMaisProximo = undefined;
        }
    }



    //Pesquisa o conjunto de vertices aberto, se encontrado retorna o vertice, se não encontrado retorna undefined
    private pesquisaVerticeConjuntoAberto(verticeRotulo: string): Vertice {
        return this.verticesConjuntoAberto.find(v =>
            v.rotulo == verticeRotulo
        )
    }

    private adicionaVerticeConjuntoFechado(vertice: Vertice): void {
        this.verticesConjuntoFechado.push(vertice);
        this.removeVerticeConjuntoAberto(vertice);
    }

    private removeVerticeConjuntoAberto(vertice): void {
        this.verticesConjuntoAberto = this.verticesConjuntoAberto.filter(v => {
            return vertice != v
        })
    }

    private iniciaVerticeInicial() {
        this.verticeInicial = this.pesquisaVerticeConjuntoAberto(this.verticeInicialRotulo);
        if (this.verticeInicial) {
            console.log("Existe o Vertice Inicial")
            this.adicionaVerticeConjuntoFechado(this.verticeInicial);
        } else {
            console.log("Não existe o Vertice Inicial")
        }
    }

    imprimirAberto() {
        console.log("===================Aberto=========================")
        this.verticesConjuntoAberto.forEach(v => {

            console.log(v);
        })
    }

    private imprimirFechado() {
        console.log("===================Fechado=========================")
        this.verticesConjuntoFechado.forEach(v => {
            console.log(v);
        })

    }

    private imprimirSolucao() {
        console.log("===================Solucao=========================")
        this.solucao.forEach(s => {
            console.log(s.destino + s.origem);
        })
    }

    private imprimirPesoTotal() {
        console.log("===================PesoTotal=========================")
        console.log(this.pesoTotal);

    }


}
export class Solucao {

    origem: string;
    destino: string;

    constructor(origem: string, destino: string) {
        this.origem = origem;
        this.destino = destino;
    }
}