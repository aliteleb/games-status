@extends('admin.layouts.app')

@section('alerts')

    {{--
    <div class="alert-box alert-box--linked alert-box--success">
        <span class="notification-label">1</span>
        <article>
            <p>
                <b>رسالة: </b>
               دي رسالة تجريبية كدا وخلاص
            </p>
        </article>
    </div>

    <div class="alert-box alert-box--linked alert-box--danger">
        <span class="notification-label">1</span>
        <article>
            <p>
                <b>رسالة: </b>
                دي رسالة تجريبية كدا وخلاص
            </p>
        </article>
    </div>

    <div class="alert-box alert-box--linked alert-box--warning">
        <span class="notification-label">1</span>
        <article>
            <p>
                <b>رسالة: </b>
                دي رسالة تجريبية كدا وخلاص
            </p>
        </article>
    </div>

    <div class="alert-box alert-box--linked alert-box--info">
        <span class="notification-label">1</span>
        <article>
            <p>
                <b>رسالة: </b>
                دي رسالة تجريبية كدا وخلاص
            </p>
        </article>
    </div>
    --}}

@endsection

@section('content')

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">جميع الألعاب</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">الألعاب المكركة</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">ألعاب لم يتم إصدارها</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">الحمايات</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">فرق القرصنة</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">الأنواع</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">جميع المستخدمين</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">مسئولين الموقع</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">جميع التعليقات</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">حالات الألعاب</h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"> الملاحظات </h5>
                    <p>0</p>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-lg-4 col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">الوظائف</h5>
                    <p>0</p>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Styles for the cards */
        .card {
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-title {
            font-size: 1.25rem;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

        .card-body {
            padding: 20px;
        }

        /* Style for the row containing the cards */
        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
        }

        /* Icon styles */
        .card-title i {
            margin-right: 10px;
        }
    </style>
@endsection
