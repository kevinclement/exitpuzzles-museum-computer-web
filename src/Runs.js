export default class Runs {
    constructor(db) {
        this.runsRef = db.ref('museum/runs')
        this.run = undefined

        this.runsRef.orderByKey().limitToLast(2000).on('value', (snapshot) => {
            let latest = undefined;
            for (const [date, run] of Object.entries(snapshot.val())) {
                if (run.finished == "") {
                    latest = date
                }
            }

            if (latest) {
                this.run = this.runsRef.child(latest)
            } else {
                this.run = undefined
            }
        })
    }

    solved() {
        if (!this.run) {
            console.log("WARN: no current run, not updating state")
            return;
        }

        this.run.child("events/quiz").update({
            timestamp: (new Date()).toLocaleString()
        })
    }
}