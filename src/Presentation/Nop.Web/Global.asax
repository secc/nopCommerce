<%@ Application Codebehind="Global.asax.cs" Inherits="Nop.Web.MvcApplication" Language="C#" %>
<script runat="server">
    void Application_Start(object sender, EventArgs e)
    {
	    //stackoverflow.com/questions/33761919/tls-1-2-in-net-framework-4-0
		//need to create registry key 
		//Set the registry key HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v4.0.30319: SchUseStrongCrypto to DWORD 1
		//Seems to work without the following code, but registry key is definitely required
        // Code that runs on application startup
        //System.Net.ServicePointManager.SecurityProtocol = (System.Net.SecurityProtocolType)3072;  same as below
        System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;  
    }
</script>
