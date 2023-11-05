<div class="container col-12">

    <div class="form-group">
        <label for="name" class="col-form-label">@lang('ui.role_name'):</label>
        <input class="form-control text" id="name" name="name" type="text" value="{{ old('name', $role->name) }}">
        @error('name')
        <span class="text-danger">{{ $message }}</span>
        @enderror
    </div>

    @foreach($permissions as $permissions_section_name => $permissions_section)

        <div class="section-permissions section">
            <span class="h3">{{ __('permissions.'.$permissions_section_name) }}</span>
            <hr>
            <div class="permissions-container">
                @foreach($permissions_section as $permission)
                    <div class="permission">
                        <input type="hidden" name="{{ $permission }}" class="for-checkbox" value="{{ old($permission) || $role->hasPermission($permission) ? '1' : '0' }}">
                        <div class="form-group trigger">
                            <label for="{{ $permission }}" class="col-form-label">@lang('permissions.'.$permission)</label>
                            <input type="checkbox" id="{{ $permission }}" {{ old($permission) || $role->hasPermission($permission) ? ' checked' : '' }}>
                            <label for="{{ $permission }}" class="col-form-label trigger-label">@lang('permissions.'.$permission):</label>
                        </div>
                        @error($permission)
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                @endforeach

            </div>
        </div>
    @endforeach

    <div class="text-left-align">
        <button type="submit" class="btn btn-lg btn-tiffany" id="submit_btn">@lang('ui.save')</button>
    </div>
</div>


<script>
    $(document).ready(function () {
        // Checkboxes synchronization
        var checkboxes = $('.permissions-form input[type=checkbox]');
        var hiddenInputs = $('.permissions-form input[type=hidden].for-checkbox');
        checkboxes.each(function(index) {
            hiddenInputs.eq(index).val($(this).prop('checked') ? 1 : 0);
        });
        checkboxes.on('change', function() {
            var checkboxIndex = checkboxes.index(this);
            hiddenInputs.eq(checkboxIndex).val($(this).prop('checked') ? 1 : 0);
        });
    });
</script>
