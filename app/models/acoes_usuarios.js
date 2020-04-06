const mongoose = require('../../db/conexao');

const AcoesUsuarios = mongoose.model('acoes_usuarios',{

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

module.exports = AcoesUsuarios