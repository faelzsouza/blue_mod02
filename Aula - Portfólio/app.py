from flask import Flask, render_template, redirect, request, flash, session
from flask_mail import Mail, Message
from config import emailBot, senha, url_postgresql
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = secret_key


mail_settings = {
    'MAIL_SERVER': 'smtp.gmail.com',
    'MAIL_PORT': 465,
    'MAIL_USE_TLS': False,
    'MAIL_USE_SSL': True,
    'MAIL_USERNAME': emailBot,
    'MAIL_PASSWORD': senha
}

app.config.update(mail_settings)
mail = Mail(app) # criar um objeto de Mail passando app como parâmetro

app.config['SQLALCHEMY_DATABASE_URI'] = url_postgresql
db = SQLAlchemy(app)


# Classe para obter os dados do formulário
class Contato:
    def __init__(self, nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem

class Projeto(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    nome = db.Column(db.String(150), nullable = False)
    imagem = db.Column(db.String(500), nullable = False)
    descricao = db.Column(db.String(500), nullable = False)
    link = db.Column(db.String(300), nullable = False)

    def __init__(self, nome, imagem, descricao, link):
        self.nome = nome
        self.imagem = imagem
        self.descricao = descricao
        self.link = link


# Rotas

@app.route('/')
def index():
    session['user_logado'] = None
    projetos = Projeto.query.all()
    return render_template('index.html', projetos = projetos)

#------------------

@app.route('/<id>')
def delProjeto(id):
    delProjeto = Projeto.query.get(id)
    return render_template('adm.html', delProjeto = delProjeto, projeto = '')

#------------------

@app.route('/send', methods=['POST'])
def send():
    formContato = Contato(
        request.form['name'],
        request.form['email'],
        request.form['message']
    )

    msg = Message(
        subject = f'Mensagem de {formContato.nome} enviada pelo portfólio',
        sender = formContato.email,
        recipients = ['faelzsouza@gmail.com'],
        body = f'''De: {formContato.nome}
E-mail: {formContato.email}

# INÍCIO DA MENSAGEM #

{formContato.mensagem}

# FIM DA MENSAGEM #'''
        )
    mail.send(msg)
    return render_template('send.html', formContato=formContato)

#------------------

@app.route('/adm', methods=['POST', 'GET'])
def adm():
    if 'user_logado' not in session or session['user_logado'] == None:
        flash('Faça logging antes!')
        return redirect('/login')

    projetos = Projeto.query.all()
    return render_template('adm.html', projetos = projetos, projeto = '')

#------------------

@app.route('/new', methods=['POST'])
def new():
    if 'user_logado' not in session or session['user_logado'] == None:
        flash('Faça logging antes!')
        return redirect('/login')
    projeto = Projeto(
        request.form['nome'], 
        request.form['imagem'], 
        request.form['descricao'], 
        request.form['link']
    )
    db.session.add(projeto)
    db.session.commit()
    flash('Deu bom, carai!')
    return redirect('/adm')

#------------------

@app.route('/edit/<id>', methods=['POST', 'GET'])
def edit(id):
    if 'user_logado' not in session or session['user_logado'] == None:
        flash('Faça logging antes!')
        return redirect('/login')
    projetos = Projeto.query.all()
    projeto = Projeto.query.get(id)
    if request.method == 'POST':
        projeto.nome = request.form['nome']
        projeto.descricao = request.form['descricao']
        projeto.imagem = request.form['imagem']
        projeto.link = request.form['link']
        db.session.commit()
        return redirect('/adm')
    return render_template('adm.html', projeto = projeto, projetos = projetos)

#------------------

@app.route('/delete/<id>', methods=['POST', 'GET'])
def delete(id):
    if 'user_logado' not in session or session['user_logado'] == None:
        flash('Faça logging antes!')
        return redirect('/login')
    projeto = Projeto.query.get(id)
    db.session.delete(projeto)
    db.session.commit()
    flash('Projeto deletado com sucesso!')
    return redirect('/adm')

# Autenticação de login

@app.route('/login', methods=['POST', 'GET'])
def login():
    return render_template('login.html')

@app.route('/auth', methods=['POST', 'GET'])
def auth():
    if request.form['senha'] == '1234':
        session['user_logado'] = 'logado'
        flash('Logado com sucesso!')
        return redirect('/adm')
    else:
        flash('Senha incorreta!')
        return redirect('/login')

# Executa o server

if __name__ == '__main__':
    db.create_all() # Cria o banco de dados
    app.run(debug=True)