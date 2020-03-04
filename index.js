// Base a ser utilizada
const alunosDaEscola = [{ nome: "Henrique", notas: [], cursos: [], faltas: 5 },
                        { nome: "Edson", notas: [], cursos: [], faltas: 2 },
                        { nome: "Bruno", notas: [10, 9.8, 9.6], cursos: [], faltas: 0 },
                        { nome: "Guilherme", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "Full Stack", dataMatricula: new Date }], faltas: 0 },
                        { nome: "Carlos", notas: [], cursos: [], faltas: 0 },
                        { nome: "Lucca", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "UX", dataMatricula: new Date }], faltas: 0 }];

// implementação

//parametro: (nome:string)
function adicionarAluno(nome) {
    /*Essa função irá receber uma *string* que é nome do aluno a ser criado.
    E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
    A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/
    let aluno = {
        nome,
        notas: [],
        cursos: [],
        faltas: 0
    }
    alunosDaEscola.push(aluno);
    console.log("O aluno(a):", nome, "cadastrado(a) com sucesso!");
}

function listarAlunos() {
    /*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema.
    Vale dizer que As informações deverão ser exibidas em um formato amigável.*/
    for (let i = 0; i < alunosDaEscola.length; i++) {
        //pega o aluno especifico
        aluno = alunosDaEscola[i];
        //imprime o nome do aluno
        console.log("Aluno(a): ", aluno.nome);
        //CURSOS
        if (aluno.cursos.length > 0) {
            for (let i = 0; i < aluno.cursos.length; i++) {
                curso = aluno.cursos[i];
                console.log("Curso: ", curso.nomeDoCurso);
                console.log("Data da Matricula: ", Date(curso.dataMatricula));
            }
        } else {
            console.log("Curso: Nenhum curso vinculado.");
        }
        //NOTAS
        if (aluno.notas.length > 0) {
            for (let i = 0; i < aluno.notas.length; i++) {
                notas = aluno.notas[i];
                console.log("Nota [%d]: ", (i + 1), aluno.notas[i]);
            }
        } else {
            console.log("Notas: Nenhuma nota foi lançada.");
        }
        console.log("Faltas: ", aluno.faltas);
        console.log("-------------------------------");
    }
}

/* 
Parametro: (nome:string)
Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. 
E deverá devolver um aluno em seu retorno. 
*/
function buscarAluno(nome) {
    let alunoEncontrado = {};
    let msg = "";
    for (let i = 0; i < alunosDaEscola.length; i++) {
        aluno = alunosDaEscola[i];
        if (aluno.nome === nome) {
            msg = "Aluno(a): " + nome + " encontrado(a).";
            alunoEncontrado = aluno;
            break;
        } else {
            msg = "Aluno(a): " + nome + " não encontrado(a).";
        }
    }
    console.log(msg);
    return alunoEncontrado;
}

/*
Parametro: (aluno:object, curso:string) 
Essa funcionalidade irá permitir, cadastrar um aluno em um curso.
Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, e deverá armazenar a data atual no momento da matricula.
Lembre-se de exibir o feedback para o usuário. 
*/
function matricularAluno(aluno, curso) {
    let existe = buscarAluno(aluno.nome);
    if (existe) {
        let nomeDoCurso = curso;
        let dataMatricula = new Date();
        aluno.cursos.push({ nomeDoCurso, dataMatricula });
        console.log("O aluno(a):", aluno.nome, "foi matriculado(a) no curso:", curso," .");
    } else {
        console.log("OPS! ERRO na matrícula! Aluno(s)", aluno.nome, "não encontrado(a).");
    }
}

/*
Parametro: (aluno:object) 
Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.
*/
function aplicarFalta(aluno) {
    let existe = buscarAluno(aluno.nome);
    if (existe) {
        if (aluno.cursos.length > 0) {
            aluno.faltas = aluno.faltas + 1;
            console.log("Faltas aplicadas para o aluno(a):", aluno.nome);
        } else {
            console.log("OPS! ERRO. Aluno(a):", aluno.nome, "não esta matriculado em nenhum curso! Matricule em um curso antes de lançar as faltas.");
        }
    } else {
        console.log("OPS! ERRO. Aluno(a)", aluno.nome, "não encontrado(a)!");
    }
}

/*
Parametro: (aluno:object)
Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá adicionar uma nota ao aluno na sua lista de notas. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
*/
function aplicarNota(aluno, notas) {
    let existe = buscarAluno(aluno.nome);
    if (existe) {
        if (aluno.cursos.length > 0) {
            aluno.notas = notas;
            console.log("Notas lançadas para o(a) aluno(a):", aluno.nome);
        } else {
            console.log("OPS! ERRO. Aluno(a):", aluno.nome, "não esta matriculado(a) em nenhum curso! Matricule em um curso antes de lançar as notas.");
        }
    } else {
        console.log("OPS! ERRO. Aluno(a)", aluno.nome, "não foi encontrado(a).");
    }
}

/*
Parametro: (aluno:object)
Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
*/
function aprovarAluno(aluno) {    
    let existe = buscarAluno(aluno.nome);
    if (existe) {
        if (aluno.cursos.length > 0) {
            if (aluno.notas.length > 0) {
                let notas = 0.0;
                for (let i = 0; i < aluno.notas.length; i++) {
                    notas += aluno.notas[i];
                }
                media = notas / aluno.notas.length;
                if (media >= 7 && aluno.faltas <= 3) {
                    console.log("Aluno:", aluno.nome, "APROVADO. Média:", media.toFixed(2),".");
                } else {
                    console.log("Aluno:", aluno.nome, "REPROVADO. Média:", media.toFixed(2),".");
                }
            } else {
                console.log("Notas não informadas para o(a) aluno(a):", aluno.nome);
            }
        } else {
            console.log("OPS! ERRO. Aluno(a):", aluno.nome, "não esta matriculado(a) em nenhum curso! Matricule em um curso antes de verificar seu status.");
        }
    } else {
        console.log("OPS! ERRO. Aluno(a)", aluno.nome, "não foi encontrado(a).");
    }
    console.log("------------------------");
}


/*
RESULTADOS
*/

//listarAlunos();
//adicionarAluno("Almeida");
//matricularAluno(alunosDaEscola[6], "Developer Java");
//console.log(alunosDaEscola[6]);
//aplicarFalta(alunosDaEscola[6]);
//console.log(alunosDaEscola[6]);
//aplicarNota(alunosDaEscola[6], [9.0, 9.0, 10.0, 10.0]);
//console.log(alunosDaEscola[6]);
//aprovarAluno(alunosDaEscola[6]);
//console.log(buscarAluno("Almeida"));
listarAlunos();
//console.log(aprovarAluno(alunosDaEscola[5]));