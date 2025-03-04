<style>
    .sidebar-main{
        position: fixed;
        top: 50px;
        bottom: 0px;
    }
</style>
<div class="sidebar" style="position: fixed; top: 15px !important;">
    <div class="sidebar-content">

        <div class="sidebar-user sidebar-user--team">
            <div class="media">
                <div class="media-left no-padding" id="store_avatar">
                    <div class="store-img-wrapper">
                        <img id="store_avatar_img" class="store-img img-circle img-sm" alt=""
                             src="{{ asset("assets/images/logo.png") }}"/>
                    </div>
                    <div class="store-name-plan">
                        <h6 class="store-name-side font-regular">
                            {{ settings('site_title') }}
                        </h6>

                        <div>
                            <div class="store-link dropdown">
                                <a href="{{ config('app.url') }}"
                                   target="_blank" class="btn visit-store">
                                   @lang('sidebar.visit_site')
                                    <i class="sicon-keyboard_arrow_left"></i>
                                </a>

                           </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-category sidebar-category-visible">
            <div class="category-content no-padding">
                <ul class="navigation navigation-main navigation-accordion">

                    <li>
                        <a href="{{route('admin.dashboard')}}">
                            <i class="sicon-home"></i>
                            <span> @lang('sidebar.home')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.games.index')}}">
                            <i class="sicon-game-controller-alt"></i>
                            <span>@lang('sidebar.games')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.protections.index')}}">
                            <i class="sicon-shield-alert"></i>
                            <span>@lang('sidebar.protections')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.groups.index')}}">
                            <i class="sicon-skull-crossbones"></i>
                            <span>@lang('sidebar.groups')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.genres.index')}}">
                            <i class="sicon-border-all"></i>
                            <span>@lang('sidebar.genres')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.statuses.index')}}">
                            <i class="sicon-alert"></i>
                            <span>@lang('sidebar.status')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.comments.index')}}">
                            <i class="sicon-chat-conversation-alt"></i>
                            <span>@lang('sidebar.comments')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.notes.index')}}">
                            <i class="sicon-checklist"></i>
                            <span>@lang('sidebar.notes')</span>
                        </a>
                    </li>
                    <li class="navigation-header">
                        <span>@lang('sidebar.users')</span>
                    </li>
                    <li>
                        <a href="{{route('admin.users.index')}}">
                            <i class="sicon-users"></i>
                            <span>@lang('sidebar.users_menu')</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{route('admin.roles.index')}}">
                            <i class="sicon-padlock-unlock"></i>
                            <span>@lang('sidebar.roles')</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .sidebar .navigation li a[href='{{request()->url()}}'] {
        color: white;
        background-color: #336B87;
    }
    .sidebar .navigation li a[href='{{request()->url()}}']:hover {
        color: white;
        background-color: #336B87;
    }
</style>
