import crypto from 'crypto';

export default {
    base64bufferEncode(buffer: Buffer): string {
        return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
    },

    base64urlEncode(data: string): string {
        return this.base64bufferEncode(Buffer.from(data.replace(/\//g, '\\/'), 'utf8'));
    },

    create(payload: Record<string, any>, privateKey: string): string {
        const encodedHeader = this.base64urlEncode(JSON.stringify({alg: 'RS256', typ: 'JWT'}));
        const encodedPayload = this.base64urlEncode(JSON.stringify(payload));
        const data = encodedHeader + '.' + encodedPayload;
        const signer = crypto.createSign('RSA-SHA256').update(data).end();
        const signature = signer.sign(privateKey);        
        return data + '.' + this.base64bufferEncode(signature);
    }
}