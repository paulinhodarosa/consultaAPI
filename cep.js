$(document).ready(function () {

    // buscar endereco pelo cep
    $("#buscarEndereco").click(function () {
        let cep = $("#cep").val().replace(/\D/g, '');
    
        if (cep !== "") {
            let validacep = /^[0-9]{8}$/; 
    
            if (validacep.test(cep)) {
                let cepNum = parseInt(cep, 10); 
                
                if (cepNum < 80000000 || cepNum > 87999999) {
                    alert("Apenas CEPs do estado do Paraná (PR) são aceitos!"); // Exibe o alerta
                    return; 
                } 
    
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf.toUpperCase());
                        $("#resultado-endereco").html("<h3>Endereço encontrado!</h3>");
                    } else {
                        $("#resultado-endereco").html("<h3 style='color: red;'>CEP não encontrado.</h3>");
                    }
                });
            } else {
                $("#resultado-endereco").html("<h3 style='color: red;'>Formato de CEP inválido.</h3>");
            }
        } else {
            $("#resultado-endereco").html("<h3 style='color: red;'>Por favor, insira um CEP.</h3>");
        }
    });
    

    // buscar cep pelo endereco
    $("#buscarCep").click(function () {
        let uf = $("#uf-busca").val().toUpperCase();
        let cidade = $("#cidade-busca").val();
        let rua = $("#rua-busca").val();
        let bairro = $("#bairro-busca").val();
        let parana = "PR";
        let parana2 = "Paraná"
    
        if (uf !== parana) {
            if (uf === "") {
                $("#resultado-cep").html("<h3 style='color: red;'>Por favor, preencha todos os campos obrigatórios.</h3>");
            } else {
                alert("Nós realizamos apenas buscas no estado do Paraná (PR)");
            }
            return;
        }
    
        if (uf && cidade && rua) {
            $.getJSON("https://viacep.com.br/ws/" + uf + "/" + cidade + "/" + rua + "/json/", function (dados) {
                if (dados && dados.length > 0) {
                    $("#cep2").val(dados[0].cep);
                    $("#resultado-cep").html("<h3>CEP encontrado!</h3>");
                } else {
                    $("#resultado-cep").html("<h3 style='color: red;'>Endereço não encontrado.</h3>");
                    $("#cep2").val(""); 
                }
            });
        } else {
            $("#resultado-cep").html("<h3 style='color: red;'>Por favor, preencha todos os campos obrigatórios.</h3>");
        }
    });
});
