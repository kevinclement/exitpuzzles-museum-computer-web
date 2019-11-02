export default class Runs {
    constructor(db) {
        this.runsRef = db.ref('museum/runs')
        this.current = undefined

        this.runsRef.orderByKey().limitToLast(2000).on('value', (snapshot) => {
            let runs = snapshot.val()
            for (const [,run] of Object.entries(runs)) {
              this.current = run
            }
        })
    }

    solved() {
        if (!this.current) {
            console.log("WARN: no current run, not updating state")
            return;
        }
        
        if (this.current.finished != "") {
            console.log("WARN: current already finished, not updating state")
            return;
        }

        this.runsRef.child(this.current.started).child("events/quiz").update({
            timestamp: (new Date()).toLocaleString()
        })
    }
}