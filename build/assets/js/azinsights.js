var appInsights = window.appInsights || function (config) {
    function s(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } }
    var t = { config: config }, r = document, u = window, e = "script", o = r.createElement(e), i, f;
    for (o.src = config.url || "https://js.monitor.azure.com/scripts/b/ai.2.min.js", r.getElementsByTagName(e)[0].parentNode.appendChild(o), t.queue = [], i = ["trackEvent", "trackPageView", "trackMetric", "trackException", "trackTrace", "trackDependency", "flush"], f = 0; f < i.length; f++) s(i[f]);
    return t
}({
    instrumentationKey: "996a88fd-9226-4df3-a055-b317c45a4fa6"
});

window.appInsights = appInsights;
appInsights.trackPageView();
