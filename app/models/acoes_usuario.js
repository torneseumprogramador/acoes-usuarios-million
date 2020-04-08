const mongoose = require('../../db/conexao');

const AcoesUsuario = mongoose.model('acoes_usuario',{

codigo_usuario:{type: Number,
               required:true,
               validate:{validator:Number.isInteger} 
               },
codigo_acao:{type: Number,
             required:true,
             validate:{validator:Number.isInteger}
            },
            
valor_investido:{type:Number,
                required:true,
                                
                }
});

module.exports = AcoesUsuario