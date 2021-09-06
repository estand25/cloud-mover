import { setupWorker, rest } from 'msw'

const worker = setupWorker(
    rest.get(
        'https://api.github.com/repos/:owner/:repo',
        (req, res, ctx) => {
            const { owner, repo } = req.params

            return res(
                ctx.status(200),
                ctx.set({ 'X-Header' : 'Mocked value'}),
                ctx.delay(1000),
                ctx.json({
                    name: 'mocked-name',
                    owner,
                    repo
                }),
            )
        },
    ),
)

worker.start()

//Example of serivce working mock action