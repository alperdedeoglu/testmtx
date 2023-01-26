const cds = require('@sap/cds');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();


module.exports = (service) => {

    service.on('UPDATE', 'tenant', async (req, next) => {
        let tenantSubdomain = req.data.subscribedSubdomain;
        await next();
        let urlForTenant = `https://${tenantSubdomain}-${process.env.APPLICATION_URI}-${process.env.namespace}.${process.env.kymaDomain}`;
        console.log("Provisioned URL for tenant:",urlForTenant);
        // Here some k8s api's to create API Rules, or virtual services...
        return urlForTenant;
    });

    service.on('DELETE', 'tenant', async (req, next) => {
        await next();
        return req.data.subscribedTenantId;
    });

    service.on('dependencies', async (req, next) => {
        let dependencies = await next();
        const services = xsenv.getServices({
            html5Runtime: { tag: 'html5-apps-repo-rt' },
            destination: { tag: 'destination' }
        });
        dependencies.push({ xsappname: services.html5Runtime.uaa.xsappname });
        dependencies.push({ xsappname: services.destination.xsappname });
        console.log("SaaS Dependencies:", JSON.stringify(dependencies));
        return dependencies;
    });

}