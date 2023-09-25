describe('Cart', function () {
    it('Ajouter un produit au panier', function () {
        cy.server()
       // cy.intercept('GET', /page./, 'fixture:product.json').as('getProduct')
        cy.visit('http://localhost:5433/')

        //vérifier si on peut acheter le produit 
        //sans etre connecté
        cy.get('[data-cy=shop]').click()
        cy.get('[data-cy=product]').click()
        cy.get('[data-cy=connectToBuy]').click()


        //se connecter pour acheter le produit et le voir
        //dans le panier
        cy.get('[data-cy=register]').click()
        cy.get('[data-cy=email]').type('test@admin.fr')
        cy.get('[data-cy=mdp]').type('TestAdmin1!')
        cy.get('[data-cy=confirmmdp]').type('TestAdmin1!')
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=register]').click()
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=shop]').click()
        cy.get('[data-cy=product]').click()
        cy.get('[data-cy=buy]').click()
        cy.get('[data-cy=account]').click()
        cy.get('[data-cy=cart]').click()
 
    })
})
