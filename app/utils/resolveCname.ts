import dns from 'dns';


/**
 * Resolves the CNAME of a domain name
 * 
 * @param domainName The domain name to resolve
 * @returns A promise that resolves to an array of CNAMEs
 * @throws An error if the domain name is invalid
 * 
**/
export const resolveCname = (domainName: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        dns.resolveCname(domainName, (error, addresses) => {
            if (error) {
                reject(error)
            } else {
                resolve(addresses)
            }
        });
    })
}