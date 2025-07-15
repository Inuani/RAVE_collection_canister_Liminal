
import Router       "mo:liminal/Router";
import RouteContext "mo:liminal/RouteContext";
import Liminal      "mo:liminal";

module Routes {
  public func routerConfig() : Router.Config {
    {
      prefix              = null;
      identityRequirement = null;
      routes = [
        Router.getQuery("/test",
          func(ctx: RouteContext.RouteContext) : Liminal.HttpResponse {
            let testHtml = "<!DOCTYPE html>"
                    # "<html><head><title>NFC Protected Test</title></head>"
                    # "<body style='font-family: Arial; text-align: center; padding: 50px;'>"
                    # "<h1 style='color: green;'> NFC PROTECTION WORKING! </h1>"
                    # "<p>You successfully accessed the protected content!</p>"
                    # "<img src='/skull.jpg' alt='Skull' style='width: 600px; height: 600px; margin: 20px;'/>"
                    # "<div style='background: #e8f5e8; padding: 20px; margin: 20px; border-radius: 10px;'>"
                    # "<h3> Access Granted</h3>"
                    # "<p>This page can only be viewed with valid NFC authentication.</p>"
                    # "</div></body></html>";

            ctx.buildResponse(#ok, #html(testHtml))
          }
        ),
        Router.getQuery("/{path}",
          func(ctx) : Liminal.HttpResponse {
            ctx.buildResponse(#notFound, #error(#message("Not found")))
          }
        ),
      ];
    }
  }
}
