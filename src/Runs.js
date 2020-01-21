export default class Runs {
    constructor(db) {
        this.runsRef = db.ref('museum/runs')
        this.run = undefined

        this.runsRef.orderByChild('timestamp').limitToLast(2000).on('value', (snapshot) => {
            let latest = undefined;
            snapshot.forEach((runSnap) => {
                let run = runSnap.val()
                let key = runSnap.key

                if (run.finished == "") {
                    latest = key
                }
            })

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