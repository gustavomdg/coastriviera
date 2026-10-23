# Landing page COAST Riviera — Casa Aura

Site estático completo em HTML, CSS e JavaScript. Vídeo vertical na hero, layout responsivo, galeria e formulário Netlify Forms. As mídias estão em public/assets.

## Publicar no Netlify

1. Importe este repositório no Netlify.
2. Não configure comando de build. Diretório de publicação: `public` (definido em netlify.toml).
3. Em Forms, habilite a detecção de formulários e faça um novo deploy. Confirme que o formulário `casa-aura` aparece.
4. Em Domain management, adicione seu domínio e siga os registros DNS indicados pelo Netlify.

## Enviar os contatos ao Praedium

Em Forms > Submission notifications, adicione uma notificação de webhook para o formulário `casa-aura`. Cole a URL privada de recebimento fornecida pelo cliente somente nessa configuração. Nunca coloque essa URL no HTML, JavaScript, README ou GitHub.

Faça uma submissão de teste após publicar e, no Praedium, mapeie nome, telefone, e-mail e mensagem a partir do payload recebido. Confira referência 21E17 / código 1825 e valide que o lead chegou. A integração não está ativa apenas por publicar o código. Os contatos também ficam no Netlify Forms; confira os limites do seu plano.

Documentação: https://docs.netlify.com/manage/forms/setup/ e https://docs.netlify.com/manage/forms/notifications/

## Prévia local

Execute `python -m http.server 8766 --directory public` e abra http://localhost:8766. O recebimento de formulários depende do Netlify e não funciona no servidor local.
