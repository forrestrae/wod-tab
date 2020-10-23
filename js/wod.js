Vue.config.debug = true;
var orgId = 30856;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

new Vue({
    el: '#app',
    data: {
        workout: {},
        wod: {},
    },
    created() {
        var todaysDate = formatDate(new Date())
        fetch('https://apis.trainheroic.com//public/org/calendar/range?orgId=' + orgId + '&startDate='+ todaysDate +'&endDate='+ todaysDate)
        //fetch('https://apis.trainheroic.com//public/org/calendar/range?orgId=' + orgId + '&startDate=2018-06-08&endDate=2018-06-08')
            .then(response => response.json())
            .then(json => {
                this.workout = json[0];
                return this.workout.id;
            })
            .then(id =>
                fetch(`https://apis.trainheroic.com/public/workout/${id}/preview?isPW=true`)
                    .then(response => response.json())
                    .then(json => {
                        this.wod = json;
                    })
            )
    }
})