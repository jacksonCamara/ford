import { Component, OnInit } from '@angular/core';
import { Vertice } from './vertice.model';
import { Arco } from './arco.model';
import { Grafo } from './grafo.model';
import { Aresta } from './aresta.model';
import { Prim } from './prim.model';
import { Kruskal } from './kruskal.model';
import { FordFulkerson } from './ford-fulkerson.model';

@Component({
  selector: 'app-cadastro-grafo',
  templateUrl: './cadastro-grafo.component.html',
  styleUrls: ['./cadastro-grafo.component.css']
})

export class CadastroGrafoComponent implements OnInit {
  public grafo: Grafo = new Grafo;
  public verticeInicial: string;

  public verificadorVertice: boolean = false;
  public vertice: Vertice = new Vertice();
  public verticeOrigem: Vertice = new Vertice();
  public verticeDestino: Vertice = new Vertice();
  public verticeOrigemRotulo: string;
  public verticeDestinoRotulo: string;
  public peso: number;

  constructor() {

  }

  ngOnInit() {
    this.iniciaGrafo();
  }

  adicionarVertice() {
    if (!this.verificarVertice(this.vertice.rotulo)) {
      this.grafo.vertices.push(this.vertice);
      console.log("Vertice Inserido");
    } else {
      console.log("Vertice já existe");
    }
    this.vertice = new Vertice();
  }

  //Procura o vertice dentro do grafo, se encontra retorna true
  private verificarVertice(rotulo: string): boolean {
    return this.grafo.vertices
      .some(v =>
        v.rotulo == rotulo)
  }

  //Procura o vertice dentro do grafo, se encontra retorna o vertice com todas suas propriedades(arestas e peso)
  private retornaVertice(rotulo: string): Vertice {
    return this.grafo.vertices.find(v =>
      v.rotulo == rotulo
    )
  }

  public adicionarAresta() {
    if (!this.verificaAresta()) {
      console.log("Aresta Adicionada")
      this.verticeOrigem.arestas.push(new Aresta(this.verticeDestino.rotulo, this.peso))
      this.verticeDestino.arestas.push(new Aresta(this.verticeOrigem.rotulo, this.peso))
    } else {
      console.log("Não inserido")
    }
    this.verticeDestinoRotulo = "";
    this.verticeOrigemRotulo = "";
    this.peso = null;
    this.grafo.vertices.forEach(v => {
      console.log(v);
    })
  }

  public adicionarArco() {
    if (!this.verificaArco()) {
      console.log("Arco adicionado")
      this.verticeOrigem.arcos.push(new Arco(this.verticeDestino.rotulo, this.peso));
    } else {
      console.log("Arco não inserido")
    }
    this.verticeDestinoRotulo = "";
    this.verticeOrigemRotulo = "";
    this.peso = null;

  }

  //Falta terminar
  private verificaArco(): boolean {
    this.verticeOrigem = this.retornaVertice(this.verticeOrigemRotulo)
    this.verticeDestino = this.retornaVertice(this.verticeDestinoRotulo)
    return false
  }


  private verificaAresta(): boolean {
    this.verticeOrigem = this.retornaVertice(this.verticeOrigemRotulo)
    this.verticeDestino = this.retornaVertice(this.verticeDestinoRotulo)
    if (this.verticeOrigem != undefined && this.verticeDestino != undefined) {
      return this.verticeOrigem.arestas.some(a =>
        a.rotuloVerticeAdjacente == this.verticeDestino.rotulo
      )
    } else if (this.verticeOrigem == undefined) {
      console.log(this.verticeOrigemRotulo + "Não existe");
      return true;
    } else if (this.verticeDestino == undefined) {
      console.log(this.verticeDestinoRotulo + "Não existe");
      return true;
    }
  }







  public prim() {
    var prim: Prim = new Prim(this.grafo.vertices, this.verticeInicial);
    prim.executar();
  }

  public kruskal() {
    let kruskal: Kruskal = new Kruskal(this.grafo.vertices, this.verticeInicial);
    kruskal.executar();
  }

  

  public imprimir() {

  }

  public resetGrafo() {
    this.grafo = new Grafo();
  }

  public fordFulkerson(){
    let fordFulkerson: FordFulkerson = new FordFulkerson(this.grafo.vertices);
    fordFulkerson.executar();
  }


  private iniciaGrafo() {

    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[0].rotulo = "s";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[1].rotulo = "a";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[2].rotulo = "b";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[3].rotulo = "c";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[4].rotulo = "d";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[5].rotulo = "t";
    //Arestas vertice S - Origem
    this.grafo.vertices[0].arcos.push(new Arco("a", 10));
    this.grafo.vertices[0].arcos.push(new Arco("c", 10));

    //Arestas vertice A
    this.grafo.vertices[1].arcos.push(new Arco("b", 4));
    this.grafo.vertices[1].arcos.push(new Arco("c", 2));
    this.grafo.vertices[1].arcos.push(new Arco("d", 8));
    //Arestas vertice B
    this.grafo.vertices[2].arcos.push(new Arco("t", 10));

    //this.grafo.vertices[2].arcos.push(new Arco("a", 5));
    //Arestas vertice C
    this.grafo.vertices[3].arcos.push(new Arco("d", 9));

    //Arestas vertice D
    this.grafo.vertices[4].arcos.push(new Arco("b", 6));
    this.grafo.vertices[4].arcos.push(new Arco("t", 10));
    //Arestas vertice T

  


    /*
    
    
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[0].rotulo = "a";
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[1].rotulo = "b";
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[2].rotulo = "c";
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[3].rotulo = "d";
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[4].rotulo = "e";
        this.grafo.vertices.push(new Vertice());
        this.grafo.vertices[5].rotulo = "f";
        //Arestas vertice A
        this.grafo.vertices[0].arestas.push(new Aresta("b", 5));
        this.grafo.vertices[0].arestas.push(new Aresta("d", 8));
        this.grafo.vertices[0].arestas.push(new Aresta("c", 4));
        //Arestas vertice B
        this.grafo.vertices[1].arestas.push(new Aresta("a", 5));
        this.grafo.vertices[1].arestas.push(new Aresta("d", 2));
        //Arestas vertice C
        this.grafo.vertices[2].arestas.push(new Aresta("a", 4));
        this.grafo.vertices[2].arestas.push(new Aresta("d", 3));
        //Arestas vertice D
        this.grafo.vertices[3].arestas.push(new Aresta("a", 8));
        this.grafo.vertices[3].arestas.push(new Aresta("b", 2));
        this.grafo.vertices[3].arestas.push(new Aresta("c", 3));
        this.grafo.vertices[3].arestas.push(new Aresta("f", 3));
        this.grafo.vertices[3].arestas.push(new Aresta("e", 7));
        //Arestas vertice E
        this.grafo.vertices[4].arestas.push(new Aresta("d", 7));
        this.grafo.vertices[4].arestas.push(new Aresta("f", 2));
        //Arestas vertice F
        this.grafo.vertices[5].arestas.push(new Aresta("d", 3));
        this.grafo.vertices[5].arestas.push(new Aresta("e", 2));
    
    
    
       


    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[0].rotulo = "a";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[1].rotulo = "b";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[2].rotulo = "c";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[3].rotulo = "d";
    this.grafo.vertices.push(new Vertice());
    this.grafo.vertices[4].rotulo = "e";
    //this.grafo.vertices.push(new Vertice());
    //this.grafo.vertices[5].rotulo = "f";
    //Arestas vertice A
    this.grafo.vertices[0].arestas.push(new Aresta("b", 1));
    this.grafo.vertices[0].arestas.push(new Aresta("c", 1));
    this.grafo.vertices[0].arestas.push(new Aresta("d", 2));
    this.grafo.vertices[0].arestas.push(new Aresta("e", 1000));
    //Arestas vertice B
    this.grafo.vertices[1].arestas.push(new Aresta("a", 1));
    this.grafo.vertices[1].arestas.push(new Aresta("c", 1));
    this.grafo.vertices[1].arestas.push(new Aresta("d", 2));
    //Arestas vertice C
    this.grafo.vertices[2].arestas.push(new Aresta("a", 1));
    this.grafo.vertices[2].arestas.push(new Aresta("b", 1));
    this.grafo.vertices[2].arestas.push(new Aresta("d", 2));
    //Arestas vertice D
    this.grafo.vertices[3].arestas.push(new Aresta("a", 2));
    this.grafo.vertices[3].arestas.push(new Aresta("b", 2));
    this.grafo.vertices[3].arestas.push(new Aresta("c", 2));

    //Arestas vertice E
    this.grafo.vertices[4].arestas.push(new Aresta("a", 1000));
    /*
    //Arestas vertice F
    this.grafo.vertices[5].arestas.push(new Aresta("b", 2));
    this.grafo.vertices[5].arestas.push(new Aresta("c", 3));
    this.grafo.vertices[5].arestas.push(new Aresta("d", 4));
    this.grafo.vertices[5].arestas.push(new Aresta("e", 8));
 */
  }

}