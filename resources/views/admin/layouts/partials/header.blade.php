<script>
    /* Get the value of 'darkmode' from localStorage */
    var darkMode = localStorage.getItem('dark_mode');

    /* Check if the value is true or false */
    if (darkMode === 'true') {
        /* Add 'dark' class to the body element */
        document.body.classList.add('dark');
    } else {
        /* Remove 'dark' class from the body element */
        document.body.classList.remove('dark');
    }
</script>

<div id="ajaxLoader"></div>

<div class="navbar navbar-inverse" id="navbar_box">
    <div class="navbar-header">
        <a class="sidebar-mobile-main-toggle" id="toggle-sidebar"><i class="sicon-menu"></i></a>
        <ul class="nav navbar-nav visible-xs navbar-top-mobile">
            <li class="changelog-headsup"></li>
            <li><a data-toggle="collapse" data-target="#navbar-user-mobile" class="mobile-avatar-box"><img
                   src="" class="mobile-avatar" alt=""></a></li>
        </ul>
    </div>
    <div class="navbar-collapse collapse" id="navbar-mobile">
        <div class="navbar-wrapper">
            <div class="navbar-container">
                <ul class="nav navbar-nav">
                    <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="sicon-menu"></i></a></li>
                </ul>

                <div id="header_nav_wrapper" class="rec-list rec-list--row-reverse rec-list--align-center">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown dropdown-user">
                            <a class="dropdown-toggle hidden-xs" data-toggle="dropdown" aria-expanded="false">
                                <div class="user-icon">
                                    <i class='sicon-person-bowtie-suspenders'></i>
                                </div>
                                <span>{{ auth()->user()->name }}</span>
                                <i class="caret"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a href="#" data-ios-redirect><i class="sicon-user"></i> @lang('ui.profile')</a></li>
                                <li><a href="#" data-ios-redirect><i class="sicon-notification"></i>@lang('ui.notification')</a></li>
                                <li class="divider"></li>
                                <li>
                                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                    <a href="#" data-ios-redirect class="text-danger" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="sicon-send-out"></i> @lang('ui.log_out')
                                    </a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                    <button type="button" class="btn btn--outlined primary btn-header-nav p-0 rec-btn--rounded dark-toggle mobile-webview-hide">

                        <i class="sicon-moon"></i>
                    </button>

                    {{--<button type="button" class="btn btn--outlined primary btn-loyalty btn-header-nav rec-btn--rounded p-0 mr-10" data-target-div="loyalty_points_dev"
                            data-target-modal="loyalty_points_modal" data-url="https://demo.salla.sa/marketplace/referrals/loyalty-points">

                        <span class="changelog-headsup hide"></span>
                        <span class="sicon-gift icon"></span>
                    </button>
                    --}}

                </div>
            </div>
        </div>
    </div>
    <div class="navbar-collapse collapse my-navbar" id="navbar-user-mobile">
        <div class="navbar-item"><a href="#"><i class="sicon-user"></i> @lang('ui.username')</a></div>
        <div class="navbar-item"><a href="#"><i class="sicon-notification"></i> @lang('ui.notification')</a></div>
        <div class="navbar-item dark-toggle-wrapper mobile-webview-hide">
            <a class="dark-toggle">
                <i class="sicon-moon"></i>
                @lang('ui.darkmode')
            </a>
        </div>
        <div class="navbar-item">
            <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
            <a class="text-danger" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                <i class="sicon-send-out"></i> @lang('ui.log_out')
            </a>
        </div>
    </div>

</div>

