const AcoesUsuario = require("../../app/models/acoes_usuario");
describe("AcoesUsuario", () => {

  beforeEach(async() => {
    await AcoesUsuario.deleteMany({}, async(err,removed) => {
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 15.30,
        percentual: 7
      })
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"petr4",
        valor_investido: 1220,
        percentual: 4
      })
    
      await AcoesUsuario.create({
        codigo_usuario: 2,
        codigo_acao:"petr4",
        valor_investido: 158,
        percentual: 6.5
      })
      
      await AcoesUsuario.create({
        codigo_usuario: 1,
        codigo_acao:"bidi4",
        valor_investido: 185,
        percentual: 11
      })
    })
  })

  describe("Deve retornar se o modelo de AcoesUsuario", () => {
    it('retornou o valor investido', (done) => {
        AcoesUsuario.findOne({}).exec( async(err, acao) => {
        let nome = `teste ${new Date().getTime()}`;
        let valorInvestido = await AcoesUsuario.valorInvestidoPorAcao(acao.codigo_usuario, acao.codigo_acao)  ;
        expect(valorInvestido.total != null && valorInvestido.total != undefined).toBe(true);
        expect(valorInvestido.acao != null && valorInvestido.acao != undefined).toBe(true);
        done();
      })
    });
   
    it('Foi criado',(done)=>{
      AcoesUsuario.create({
        codigo_usuario: "1",
        codigo_acao:"ZM007",
        valor_investido:45,
        percentual:15
      },(err,res)=>{
         expect(err == undefined  || err == null).toBe(true)
      })
    done();
    })

    it('alterou  o valor investido e percentual ', async(done) => {
      let acao = await AcoesUsuario.create({
        codigo_usuario:"6546asd654a",
        codigo_acao: "Sab4",
        valor_investido: 3600,
        percentual: 8
      });

      let acao_alterada = await AcoesUsuario.findByIdAndUpdate( acao._id, {valor_investido: 1550,percentual:50},{new: true});
      
      expect(acao_alterada !==null  && acao_alterada !==undefined).toBe(true)
      expect(acao_alterada.valor_investido == 1550).toBe(true)
      expect(acao_alterada.percentual == 50).toBe(true)
      done();
    });


    it('salvou o percentual e o valor investido apenas após a 18h', async(done) => {
      let atual = new Date(Date.now());
      var mercado_aberto = false;

      let acao = await AcoesUsuario.create({
        codigo_usuario:"sldjl654sdf",
        codigo_acao: "LET3",
        valor_investido: 5600,
        percentual: 11
      });

      if (atual.getHours() >= 10 && atual.getHours() <= 18) {
        mercado_aberto = true;
        let acrescimo_percentual = (Math.random() * acao.percentual) < 0.5 ? (Math.random()*-1) : Math.random();
        acao.percentual += acrescimo_percentual;
        await acao.save();
      }
      else if (atual.getHours() > 18 && mercado_aberto == true) {
        valor_somar = (acao.valor_investido * acao.percentual) / 100
        acao.valor_investido += valor_somar;
        acao.save();
        mercado_aberto = false;
      }
      
      if (atual.getHours() >= 10 && atual.getHours() <= 18) {
        expect(acao.valor_investido == 5600).toBe(true);
      }

      else if (atual.getHours() > 18 && mercado_aberto == true) {
        expect(acao.valor_investido != 5600).toBe(true);
      }

      else if (atual.getHours() > 18 && atual.getHours() < 10 && mercado_aberto == false) {
        expect(acao.valor_investido == 5600).toBe(true);
      }

      done();
    });


    it('alterou o rendimento percentual apenas após as 10h e antes das 18h', async(done) => {
      let atual = new Date(Date.now());
      var mercado_aberto = false;

      let acao = await AcoesUsuario.create({
        codigo_usuario:"4df465g465",
        codigo_acao: "LET4",
        valor_investido: 5600,
        percentual: 11
      });

      if (atual.getHours() >= 10 && atual.getHours() <= 18) {
        mercado_aberto = true;
        let acrescimo_percentual = (Math.random() * acao.percentual) < 0.5 ? (Math.random()*-1) : Math.random();
        acao.percentual += acrescimo_percentual;
        await acao.save();
      }
      else if (atual.getHours() > 18 && mercado_aberto == true) {
        valor_somar = (acao.valor_investido * acao.percentual) / 100
        acao.valor_investido += valor_somar;
        acao.save();
        mercado_aberto = false;
      }
      
      if (atual.getHours() >= 10 && atual.getHours() <= 18) {
        expect(acao.percentual != 11).toBe(true);
      }

      else if (atual.getHours() > 18 && mercado_aberto == true) {
        expect(acao.percentual == 11).toBe(true);
      }

      else if (atual.getHours() > 18 && atual.getHours() < 10 && mercado_aberto == false) {
        expect(acao.percentual == 11).toBe(true);
      }

      done();
    });  

  it(' Permite Deletou  um registro',async(done) =>{
    let acao = await AcoesUsuario.create({
      codigo_usuario:"99998888",
      codigo_acao: "AMZOO8",
      valor_investido: 9652100,
      percentual: 38
    });

    await AcoesUsuario.deleteOne({_id: acao._id}, (err) =>{ 
        expect(err == null || err == undefined).toBe(true);
        AcoesUsuario.findOne({_id: acao._id}).exec( async(err, acao) => {
        expect(acao == null && acao == undefined).toBe(true);
      })

    });   
    done();
    
  })

  it('Testar  o método vender',async(done) => {

    let acao_1 = await AcoesUsuario.create({
      codigo_usuario:"112233",
      codigo_acao: "ABC123",
      valor_investido: 2211,
      percentual: 15
    });

    let acao_2 = await AcoesUsuario.create({
      codigo_usuario:"112233",
      codigo_acao: "ABC123",
      valor_investido: 500,
      percentual: 6
    });

   await AcoesUsuario.vender(acao_1.codigo_usuario, acao_1.codigo_acao)
   AcoesUsuario.findOne({_id: acao_1._id}).exec( async(err, acao) => {
    expect(acao == null && acao == undefined).toBe(true);
  })
  AcoesUsuario.findOne({_id: acao_2._id}).exec( async(err, acao) => {
  expect(acao == null && acao == undefined).toBe(true);
  })
  done();
  })


  })
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            