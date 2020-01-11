using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
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
        public async Task View(string group, string uri)
        {
            try
            {
                await Clients.Group(group).SendAsync("view", uri);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
            }
        }
        public async Task Join(string userName)
        {
            // await JoinOrCreateAggregateAsync(userName);
            await Clients.All.SendAsync("joined", userName);
        }
        public async Task JoinMain(string userName)
        {
            await Clients.All.SendAsync("joinedmain", userName);
            await Groups.AddToGroupAsync(Context.ConnectionId, Context.ConnectionId);
        }
        public async Task JoinViewer(string name, string connectionId)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, connectionId).Wait();
            await Clients.Group(connectionId).SendAsync("joinedviewer", name);
        }
    }
}
