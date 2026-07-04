interface Props {
    history: any[];
}

export default function NotificationCard({
    history
}: Props) {

    const latest = history.length
        ? history[0]
        : null;

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-blue-700 mb-4">

                Latest Notification

            </h2>

            {

                !latest ?

                    (

                        <p className="text-gray-500">

                            No Notifications

                        </p>

                    )

                    :

                    latest.status === "APPROVED" ?

                        (

                            <div className="bg-green-100 p-4 rounded-lg">

                                <h3 className="font-semibold text-green-700">

                                    🎉 Leave Approved

                                </h3>

                                <p className="mt-2">

                                    Enjoy your leave.

                                </p>

                            </div>

                        )

                        :

                        latest.status === "REJECTED" ?

                            (

                                <div className="bg-red-100 p-4 rounded-lg">

                                    <h3 className="font-semibold text-red-700">

                                        ❌ Leave Rejected

                                    </h3>

                                    <p className="mt-2">

                                        {latest.feedback}

                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="bg-yellow-100 p-4 rounded-lg">

                                    <h3 className="font-semibold text-yellow-700">

                                        ⏳ Pending Approval

                                    </h3>

                                    <p className="mt-2">

                                        Waiting for Admin Approval

                                    </p>

                                </div>

                            )

            }

        </div>

    );

}