using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QIQO.WS.POC.Main.Core
{
    public class CommunicationHub : Hub
    {
        private readonly ILogger<CommunicationHub> _logger;

        public CommunicationHub(ILogger<CommunicationHub> logger)
        {
            _logger = logger;
        }
        public async Task View(string uri)
        {
            try
            {
                await Clients.Others.SendAsync("view", uri);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
            }
        }
        public async Task Join(string userName)
        {
            await Clients.All.SendAsync("joined", userName);
        }
    }
}
