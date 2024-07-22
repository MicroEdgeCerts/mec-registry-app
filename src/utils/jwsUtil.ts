import jose from 'node-jose'

export const getJWK = async ( publicPem: string ): Promise< any > => {
    try {
        // Load PEM key
        const key = await jose.JWK.asKey(publicPem, 'pem');

        // Convert to JWK format
        const jwk = key.toJSON(true); // `true` for private key

        console.log('Converted JWK:');
        console.log(jwk);
        return jwk;
    } catch (err) {
        console.error('Error converting PEM to JWK:', err);
    }

}